import axios from "axios";
import { useState } from "react";
import { UserCard } from "./components/UserCard";
import "./styles.css";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";

export default function App() {
  const [userProfile, setUserProfile] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFechUser = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 受け取ったres.dataから、id/name/email/addressだけを取り出して意図した書式で表す
        const data = res.data.map((user) => ({
          //　↓user=res.data
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfile(data);
      })
      .catch(() => {
        // errorがtrueになれば、「Loading....」はそもそも表示されない
        setError(true);
      })
      .finally(() => {
        //　最終的にはfalseとなり、「Loading....」は非表示
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFechUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading....</p>
      ) : (
        <>
          {userProfile.map((user) => (
            <UserCard key={user.id} user={user} />
            //user = user.data
          ))}
        </>
      )}
    </div>
  );
}
