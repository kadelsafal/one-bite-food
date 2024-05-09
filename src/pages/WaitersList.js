import '../styles/WaiterList.css';

const WaiterList = () => {
  // Sample list of active waiters
  const activeWaiters = [
    { id: 1, name: "John Doe", picture: "https://i.pinimg.com/736x/ee/8a/bd/ee8abda5e14ce1718626a1198a22d7ca.jpg" },
    { id: 2, name: "Alice Smith", picture: "https://i.pinimg.com/564x/96/24/7c/96247ca1844c6d2b565f70f9cea0a597.jpg" },
    { id: 3, name: "Aarya Basnet", picture: "https://i.pinimg.com/564x/53/2c/34/532c348e3127b6136281db068d82680d.jpg" },
    { id: 4, name: "Mihir Rai", picture: "https://i.pinimg.com/736x/97/c1/31/97c13130596a2956a56e91751d1e9991.jpg" }
  ];

  return (
    <div className="waiter-list">
      <h2>Active Waiters</h2>
      <ul>
        {activeWaiters.map(waiter => (
          <li key={waiter.id}>
            <div className="waiter-picture" style={{ backgroundImage: `url(${waiter.picture})` }}></div>
            <span className="waiter-name">{waiter.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WaiterList;
