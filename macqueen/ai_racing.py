import numpy as np
import neat
import os
import pickle
import random
import math
from typing import List, Tuple

class Car:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.angle = 0
        self.speed = 0
        self.max_speed = 5
        self.acceleration = 0.2
        self.turn_speed = 3
        self.width = 20
        self.height = 30
        self.alive = True
        self.fitness = 0
        self.checkpoints_passed = 0
        self.total_checkpoints = 0
        self.time_alive = 0
        
    def update(self, action):
        # action[0] - ускорение/торможение (-1 to 1)
        # action[1] - поворот (-1 to 1)
        
        # Обновление скорости
        self.speed += action[0] * self.acceleration
        self.speed = np.clip(self.speed, -self.max_speed/2, self.max_speed)
        
        # Обновление угла
        self.angle += action[1] * self.turn_speed * (self.speed / self.max_speed)
        
        # Обновление позиции
        self.x += math.cos(math.radians(self.angle)) * self.speed
        self.y += math.sin(math.radians(self.angle)) * self.speed
        
        # Увеличение времени жизни
        self.time_alive += 1
        
        # Уменьшение фитнеса со временем (штраф за медленную езду)
        if self.speed < 1:
            self.fitness -= 0.1
            
    def get_sensor_data(self, track_boundaries):
        """Получение данных с сенсоров машины"""
        sensors = []
        sensor_angles = [-90, -45, 0, 45, 90]  # Углы сенсоров
        
        for angle_offset in sensor_angles:
            sensor_angle = self.angle + angle_offset
            distance = self.get_distance_to_boundary(sensor_angle, track_boundaries)
            sensors.append(distance)
            
        # Добавляем скорость и угол как дополнительные сенсоры
        sensors.append(self.speed / self.max_speed)
        sensors.append(self.angle / 360)
        
        return sensors
    
    def get_distance_to_boundary(self, angle, track_boundaries):
        """Вычисление расстояния до границы трассы в заданном направлении"""
        ray_length = 200
        ray_x = self.x + math.cos(math.radians(angle)) * ray_length
        ray_y = self.y + math.sin(math.radians(angle)) * ray_length
        
        # Простое определение пересечения с границами
        # В реальной реализации здесь была бы более сложная логика
        min_distance = ray_length
        
        for boundary in track_boundaries:
            # Упрощенная проверка пересечения
            distance = math.sqrt((ray_x - boundary[0])**2 + (ray_y - boundary[1])**2)
            if distance < min_distance:
                min_distance = distance
                
        return min_distance / ray_length  # Нормализация
    
    def check_collision(self, track_boundaries):
        """Проверка столкновения с границами трассы"""
        # Проверяем все углы машины
        car_corners = [
            (self.x - self.width/2, self.y - self.height/2),
            (self.x + self.width/2, self.y - self.height/2),
            (self.x + self.width/2, self.y + self.height/2),
            (self.x - self.width/2, self.y + self.height/2)
        ]
        
        for corner in car_corners:
            # Поворачиваем углы машины
            rotated_x = (corner[0] - self.x) * math.cos(math.radians(-self.angle)) - \
                       (corner[1] - self.y) * math.sin(math.radians(-self.angle)) + self.x
            rotated_y = (corner[0] - self.x) * math.sin(math.radians(-self.angle)) + \
                       (corner[1] - self.y) * math.cos(math.radians(-self.angle)) + self.y
            
            # Проверяем, находится ли угол за пределами трассы
            if not self.is_point_inside_track(rotated_x, rotated_y, track_boundaries):
                return True
                
        return False
    
    def is_point_inside_track(self, x, y, track_boundaries):
        """Проверка, находится ли точка внутри трассы"""
        # Упрощенная проверка - точка должна быть в пределах границ
        min_x = min(boundary[0] for boundary in track_boundaries)
        max_x = max(boundary[0] for boundary in track_boundaries)
        min_y = min(boundary[1] for boundary in track_boundaries)
        max_y = max(boundary[1] for boundary in track_boundaries)
        
        return min_x <= x <= max_x and min_y <= y <= max_y
    
    def check_checkpoint(self, checkpoints):
        """Проверка прохождения чекпоинта"""
        for i, checkpoint in enumerate(checkpoints):
            if i == self.checkpoints_passed:
                checkpoint_x, checkpoint_y, checkpoint_radius = checkpoint
                distance = math.sqrt((self.x - checkpoint_x)**2 + (self.y - checkpoint_y)**2)
                
                if distance < checkpoint_radius:
                    self.checkpoints_passed += 1
                    self.fitness += 100  # Бонус за прохождение чекпоинта
                    return True
        return False

class Track:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.boundaries = self.generate_track()
        self.checkpoints = self.generate_checkpoints()
        
    def generate_track(self):
        """Генерация трассы в виде замкнутого контура"""
        # Создаем овальную трассу
        center_x, center_y = self.width // 2, self.height // 2
        outer_radius_x, outer_radius_y = 300, 200
        inner_radius_x, inner_radius_y = 200, 100
        
        boundaries = []
        
        # Внешняя граница
        for angle in range(0, 360, 5):
            rad = math.radians(angle)
            x = center_x + outer_radius_x * math.cos(rad)
            y = center_y + outer_radius_y * math.sin(rad)
            boundaries.append((x, y))
            
        # Внутренняя граница (для создания дороги)
        for angle in range(360, 0, -5):
            rad = math.radians(angle)
            x = center_x + inner_radius_x * math.cos(rad)
            y = center_y + inner_radius_y * math.sin(rad)
            boundaries.append((x, y))
            
        return boundaries
    
    def generate_checkpoints(self):
        """Генерация чекпоинтов на трассе"""
        center_x, center_y = self.width // 2, self.height // 2
        checkpoints = []
        
        # Создаем чекпоинты по периметру трассы
        for angle in range(0, 360, 45):
            rad = math.radians(angle)
            x = center_x + 250 * math.cos(rad)  # Средний радиус
            y = center_y + 150 * math.sin(rad)
            checkpoints.append((x, y, 30))  # x, y, радиус
            
        return checkpoints

class AIRacingGame:
    def __init__(self, config_file="config.txt"):
        self.track = Track(800, 600)
        self.cars = []
        self.generation = 1
        self.population_size = 50
        self.current_agent = 0
        self.best_fitness = 0
        self.successful_attempts = 0
        self.total_time = 0
        
        # Загрузка конфигурации NEAT
        self.config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction,
                                 neat.DefaultSpeciesSet, neat.DefaultStagnation, config_file)
        
        # Создание популяции
        self.population = neat.Population(self.config)
        
        # Добавление статистики
        self.population.add_reporter(neat.StdOutReporter(True))
        self.stats = neat.StatisticsReporter()
        self.population.add_reporter(self.stats)
        
    def create_cars(self):
        """Создание машин для текущего поколения"""
        self.cars = []
        for i in range(self.population_size):
            # Создаем машину в случайной позиции на трассе
            start_x = self.track.width // 2 + random.randint(-50, 50)
            start_y = self.track.height // 2 + random.randint(-50, 50)
            car = Car(start_x, start_y)
            self.cars.append(car)
    
    def evaluate_genome(self, genome, config):
        """Оценка фитнеса генома"""
        net = neat.nn.FeedForwardNetwork.create(genome, config)
        
        # Создаем машину для этого генома
        car = Car(self.track.width // 2, self.track.height // 2)
        
        # Симуляция движения
        for _ in range(1000):  # Максимум 1000 шагов
            if not car.alive:
                break
                
            # Получаем данные с сенсоров
            sensor_data = car.get_sensor_data(self.track.boundaries)
            
            # Получаем решение от нейросети
            output = net.activate(sensor_data)
            
            # Применяем действия
            car.update(output)
            
            # Проверяем столкновения
            if car.check_collision(self.track.boundaries):
                car.alive = False
                break
                
            # Проверяем чекпоинты
            car.check_checkpoint(self.track.checkpoints)
            
            # Обновляем фитнес
            car.fitness += car.speed * 0.1  # Бонус за скорость
            
        # Финальный фитнес
        final_fitness = car.fitness + car.checkpoints_passed * 100
        
        if car.checkpoints_passed >= len(self.track.checkpoints):
            self.successful_attempts += 1
            
        return final_fitness
    
    def run_generation(self):
        """Запуск одного поколения"""
        self.create_cars()
        
        # Оценка всех геномов
        winner = self.population.run(self.evaluate_genome, 1)
        
        # Обновление статистики
        self.generation += 1
        self.best_fitness = max(self.best_fitness, winner.fitness)
        
        return winner
    
    def save_best_genome(self, genome, filename="best_genome.pkl"):
        """Сохранение лучшего генома"""
        with open(filename, 'wb') as f:
            pickle.dump(genome, f)
    
    def load_best_genome(self, filename="best_genome.pkl"):
        """Загрузка лучшего генома"""
        if os.path.exists(filename):
            with open(filename, 'rb') as f:
                return pickle.load(f)
        return None

# Функция для создания конфигурационного файла NEAT
def create_config_file():
    config_content = """
[NEAT]
fitness_criterion     = max
fitness_threshold     = 1000
pop_size              = 50
reset_on_extinction   = False

[DefaultGenome]
# node activation options
activation_default      = tanh
activation_mutate_rate = 0.0
activation_options     = tanh

# node add/remove rates
node_add_prob           = 0.2
node_delete_prob        = 0.2

# node connection options
connection_add_prob    = 0.5
connection_delete_prob = 0.5

# network parameters
num_hidden              = 0
num_inputs              = 7
num_outputs             = 2

# node bias options
bias_init_mean          = 0.0
bias_init_stdev         = 1.0
bias_max_value          = 30.0
bias_min_value          = -30.0
bias_mutate_power       = 0.5
bias_mutate_rate        = 0.7
bias_replace_rate       = 0.1

# node response options
response_init_mean      = 1.0
response_init_stdev     = 0.0
response_max_value      = 30.0
response_min_value      = -30.0
response_mutate_power   = 0.0
response_mutate_rate    = 0.0
response_replace_rate   = 0.0

# connection weight options
weight_init_mean        = 0.0
weight_init_stdev       = 1.0
weight_max_value        = 30
weight_min_value        = -30
weight_mutate_power     = 0.5
weight_mutate_rate      = 0.8
weight_replace_rate     = 0.1

# connection enable options
enabled_default         = True
enabled_mutate_rate     = 0.01

feed_forward            = True
initial_connection      = full

# node add/remove rates
node_add_prob           = 0.2
node_delete_prob        = 0.2

# network parameters
num_hidden              = 0
num_inputs              = 7
num_outputs             = 2

[DefaultSpeciesSet]
compatibility_threshold = 3.0

[DefaultStagnation]
species_fitness_func = max
max_stagnation        = 20
species_elitism       = 2

[DefaultReproduction]
elitism            = 2
survival_threshold = 0.2
"""
    
    with open("config.txt", "w") as f:
        f.write(config_content)

if __name__ == "__main__":
    # Создаем конфигурационный файл
    create_config_file()
    
    # Создаем игру
    game = AIRacingGame()
    
    # Запускаем обучение
    print("Начинаем обучение ИИ...")
    winner = game.run_generation()
    
    print(f"Лучший фитнес: {winner.fitness}")
    print(f"Успешных попыток: {game.successful_attempts}")
    
    # Сохраняем лучший геном
    game.save_best_genome(winner) 