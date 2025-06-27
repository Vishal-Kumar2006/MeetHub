export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="container">
        <div className="col navheader">
          <h2>Meet Hub Call</h2>
        </div>
        <div className="col navlink">
            <p>Join as guest</p>
            <p>Register</p>
            <div role="button">
                <p style={{color:"#FF9839"}}>Login</p>
            </div>
        </div>
      </div>
    </div>
  );
}
