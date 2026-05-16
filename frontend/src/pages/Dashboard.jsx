import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Dashboard</h1>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={cardStyle}>
            <h3>Total Beds</h3>
            <p>120</p>
          </div>

          <div style={cardStyle}>
            <h3>Occupied</h3>
            <p>80</p>
          </div>

          <div style={cardStyle}>
            <h3>Available</h3>
            <p>40</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#f3f4f6",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
};

export default Dashboard;