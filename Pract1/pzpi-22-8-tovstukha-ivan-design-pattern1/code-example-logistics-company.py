# Клас для логістичних компаній
class Logistics:
    def create_transport(self):
        pass

# Конкретна компанія для автомобільних перевезень
class RoadLogistics(Logistics):
    def create_transport(self):
        return "Автомобіль для перевезення вантажів"

# Конкретна компанія для морських перевезень
class SeaLogistics(Logistics):
    def create_transport(self):
        return "Корабель для перевезення вантажів"

# Фабричний метод для створення логістичної компанії
def logistics_factory(type):
    if type == "road":
        return RoadLogistics()
    elif type == "sea":
        return SeaLogistics()
    else:
        raise ValueError("Невідомий тип логістики")

# Приклад використання для різних типів логістики
logistics_types = ["road", "sea"]
for logistics_type in logistics_types:
    logistics = logistics_factory(logistics_type)
    transport = logistics.create_transport()
    print(f"Тип логістики: {logistics_type} 
    - Створено транспорт: {transport}")
