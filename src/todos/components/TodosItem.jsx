export function TodosItem({ todo }) {
  return (
    <li className="completed">
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked />
        <label>Taste JavaScript</label>
        <button className="destroy"></button>
      </div>
      <input className="edit" defaultValue="Create a TodoMVC template" />
    </li>
  );
}
