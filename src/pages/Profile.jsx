import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return <section className="page-container narrow"><div className="eyebrow">ACCOUNT</div><h1>Your profile</h1><div className="profile-panel"><div className="avatar">{user?.name?.slice(0, 2).toUpperCase()}</div><div><h2>{user?.name}</h2><p>{user?.email}</p></div></div><div className="form-section"><label>Full name<input defaultValue={user?.name} /></label><label>Email address<input defaultValue={user?.email} type="email" /></label><label>Phone number<input placeholder="Add your phone number" /></label><button className="button">Save changes</button></div></section>;
}
