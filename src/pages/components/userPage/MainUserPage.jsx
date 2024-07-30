const MainUserPage = () => {
  return (
    <section className="user-wrapper">
      <div className="user-image">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
        <h2>User</h2>
      </div>

      <section className="main-info">
        <div className="user-l">
          <div className="info-sections">
            <label htmlFor="user">Nazwa</label>
            <input type="text" placeholder="user123" disabled />
            <p>Zmień swoją nazwę</p>
          </div>
          <div className="info-sections">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="user123@email.com" disabled />
            <p>Zmień swój email</p>
          </div>
          <div className="info-sections">
            <label htmlFor="password">Hasło</label>
            <input type="password" placeholder="******" disabled />
            <p>Zmień swoje hasło</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MainUserPage;
