import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      logout: "Logout",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      welcome: "Welcome to Aquarium Monitoring System",
      pleaseLogin: "Please login to access your aquariums",
      home: "Home",
      aquariums: "Aquariums",
      devices: "Devices",
      users: "Users",
      admin: "Admin",
      manager: "Manager",
      user: "User",
      yourAquariums: "Your Aquariums",
      allAquariums: "All Aquariums",
      volume: "Volume",
      liters: "liters",
      temperature: "Temperature",
      oxygen: "Oxygen",
      ph: "pH",
      mgL: "mg/l",
      viewDetails: "View Details",
      edit: "Edit",
      addAquarium: "Add Aquarium",
      name: "Name",
      save: "Save",
      cancel: "Cancel",
      parameters: "Parameters",
      charts: "Charts",
      back: "Back",
      addReading: "Add Sensor Reading",
      addDevice: "Add Device",
      deviceName: "Device Name",
      deviceType: "Device Type",
      thermostat: "Thermostat",
      aerator: "Aerator",
      phController: "pH Controller",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      maintenance: "Maintenance",
      activate: "Activate",
      deactivate: "Deactivate",
      endMaintenance: "End Maintenance",
      delete: "Delete",
      usersManagement: "Users Management",
      addUser: "Add User",
      role: "Role",
      noDevices: "No devices found",
      noAquariums: "No aquariums found",
      noUsers: "No users found",
      invalidCredentials: "Invalid email or password",
      loading: "Loading...",
      permissionDenied: "You don't have permission to access this page",
      confirmDelete: "Are you sure you want to delete this item?",
      language: "Language",
      english: "English",
      ukrainian: "Ukrainian",
    },
  },
  ua: {
    translation: {
      login: "Увійти",
      logout: "Вийти",
      email: "Електронна пошта",
      password: "Пароль",
      signIn: "Увійти",
      welcome: "Ласкаво просимо до системи моніторингу акваріумів",
      pleaseLogin: "Будь ласка, увійдіть для доступу до ваших акваріумів",
      home: "Головна",
      aquariums: "Акваріуми",
      devices: "Пристрої",
      users: "Користувачі",
      admin: "Адміністратор",
      manager: "Менеджер",
      user: "Користувач",
      yourAquariums: "Ваші акваріуми",
      allAquariums: "Всі акваріуми",
      volume: "Об'єм",
      liters: "літрів",
      temperature: "Температура",
      oxygen: "Кисень",
      ph: "pH",
      mgL: "мг/л",
      viewDetails: "Детальніше",
      edit: "Редагувати",
      addAquarium: "Додати акваріум",
      name: "Назва",
      save: "Зберегти",
      cancel: "Скасувати",
      parameters: "Параметри",
      charts: "Графіки",
      back: "Назад",
      addReading: "Додати показники",
      addDevice: "Додати пристрій",
      deviceName: "Назва пристрою",
      deviceType: "Тип пристрою",
      thermostat: "Термостат",
      aerator: "Аератор",
      phController: "Контролер pH",
      status: "Статус",
      active: "Активний",
      inactive: "Неактивний",
      maintenance: "Обслуговування",
      activate: "Активувати",
      deactivate: "Деактивувати",
      endMaintenance: "Завершити обслуговування",
      delete: "Видалити",
      usersManagement: "Управління користувачами",
      addUser: "Додати користувача",
      role: "Роль",
      noDevices: "Пристроїв не знайдено",
      noAquariums: "Акваріумів не знайдено",
      noUsers: "Користувачів не знайдено",
      invalidCredentials: "Невірний email або пароль",
      loading: "Завантаження...",
      permissionDenied: "У вас немає прав для доступу до цієї сторінки",
      confirmDelete: "Ви впевнені, що хочете видалити цей елемент?",
      language: "Мова",
      english: "Англійська",
      ukrainian: "Українська",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
