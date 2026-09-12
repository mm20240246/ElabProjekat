import { useAuth } from "../context/AuthContext";

 

function ProfilePage() {

  const { currentUser } = useAuth();

 

  return (

    <main className="page-container">

      <section className="profile-page-card">

        <h1>Profil korisnika</h1>

 

        <div className="profile-info-row">

          <span>Ime:</span>

          <strong>{currentUser?.name}</strong>

        </div>

 

        <div className="profile-info-row">

          <span>E-mail:</span>

          <strong>{currentUser?.email}</strong>

        </div>

      </section>

    </main>

  );

}

 

export default ProfilePage;