import { useEffect, useState } from "react";

const Home = () => {
	const URL = "https://playground.4geeks.com/todo/";
	const USERNAME = "miguel260383";

	const [tarea, setTarea] = useState([]);
	const [lista, setLista] = useState("");

	const getTarea = async () => {
		const response = await fetch(`${URL}users/${USERNAME}`);

		if (!response.ok) {
			await crearTarea();
			return;
		}

		const data = await response.json();
		setTarea(data.todos);
	};

	const crearTarea = async () => {
		await fetch(`${URL}users/${USERNAME}`, {
			method: "POST"
		});
		await getTarea();
	};

	const sendTask = async () => {
		if (!lista.trim()) return;

		await fetch(`${URL}todos/${USERNAME}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				label: lista,
				is_done: false
			})
		});

		setLista("");
		await getTarea();
	};

	const eliminarTarea = async (id) => {
		await fetch(`${URL}todos/${id}`, {
			method: "DELETE"
		});
		await getTarea();
	};

	useEffect(() => {
		getTarea();
	}, []);

	return (
		<div className="container">
			<h1>Tareas por hacer...</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					sendTask();
				}}
			>
				<input
					type="text"
					value={lista}
					onChange={(e) => setLista(e.target.value)}
					placeholder="Escribe una tarea"
				/>
			</form>

			<button
				type="button"
				className="btn btn-secondary"
				onClick={sendTask}
			>
				Agregar
			</button>

			<ul>
				{tarea.map((item) => (
					<li key={item.id}>
						{item.label}
						<button
							className="btn btn-outline-danger"
							onClick={() => eliminarTarea(item.id)}
						>
							X
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
