import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext"; // Supondo que você tenha um contexto para autenticação
import styles from "./NotificationBell.module.css";

const NotificationBell = () => {
  const { user } = useAuth();  // Pegando o usuário logado do contexto de autenticação
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [preferences, setPreferences] = useState({
    frequency: "daily",
    criteria: { breed: "", ageRange: "any" },
  });

  // Carregar notificações apenas para o usuário logado
  useEffect(() => {
    if (user) {
      // Função para buscar notificações de um usuário específico
      const fetchNotifications = async () => {
        const mockData = [
          { id: 1, userId: user.id, name: "Rex", breed: "Golden Retriever", age: 3, link: "/profile/1" },
          { id: 2, userId: user.id, name: "Luna", breed: "Poodle", age: 2, link: "/profile/2" },
          // Outras notificações de outros usuários não serão retornadas
        ];

        // Filtrando as notificações para o usuário logado
        const filteredNotifications = mockData.filter(notification => notification.userId === user.id);
        setNotifications(filteredNotifications);
      };

      fetchNotifications();
    }
  }, [user]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handlePreferenceChange = (event) => {
    const { name, value } = event.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;
    setPreferences((prev) => ({
      ...prev,
      criteria: { ...prev.criteria, [name]: value },
    }));
  };

  const savePreferences = async (event) => {
    event.preventDefault();
    // Simulação de envio ao backend
    console.log("Saving preferences:", preferences);
    alert("Preferências salvas com sucesso!");
  };

  return (
    <div className={styles.notificationContainer}>
      {/* Ícone do sininho */}
      <div className={styles.bellIcon} onClick={toggleNotifications}>
        <span className={styles.notificationCount}>
          {notifications.length}
        </span>
        🔔
      </div>

      {/* Lista de notificações */}
      {showNotifications && (
        <div className={styles.notificationList}>
          <h3 className={styles.notificationTitle}>Notificações</h3>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                <p>
                  <strong>{notification.name}</strong> - {notification.breed} ({notification.age} anos)
                </p>
                <p className={styles.notificationDetails}>
                  Confira o perfil para ver mais detalhes sobre {notification.name}.
                </p>
                <a href={notification.link} className={styles.viewLink}>
                  Ver perfil
                </a>
              </div>
            ))
          ) : (
            <p className={styles.noNotifications}>Nenhuma notificação pendente.</p>
          )}
        </div>
      )}

      {/* Configurações de alertas */}
      <div className={styles.preferencesSection}>
        <h3 className={styles.preferencesTitle}>Configuração de Alertas</h3>
        <form onSubmit={savePreferences} className={styles.preferencesForm}>
          <div className={styles.formGroup}>
            <label htmlFor="frequency">Frequência de alertas:</label>
            <select
              id="frequency"
              name="frequency"
              value={preferences.frequency}
              onChange={handlePreferenceChange}
            >
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="breed">Raça preferida:</label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={preferences.criteria.breed}
              onChange={handleCriteriaChange}
              placeholder="Digite a raça"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ageRange">Faixa etária:</label>
            <select
              id="ageRange"
              name="ageRange"
              value={preferences.criteria.ageRange}
              onChange={handleCriteriaChange}
            >
              <option value="any">Qualquer</option>
              <option value="puppy">Filhote</option>
              <option value="adult">Adulto</option>
              <option value="senior">Idoso</option>
            </select>
          </div>
          <button type="submit" className={styles.saveButton}>
            Salvar Preferências
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationBell;
