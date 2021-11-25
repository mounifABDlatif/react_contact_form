import React, { useState } from "react"; //on appelle le useState car on utilise des hooks pour tout ce qui sera renseigné des les inputs

const App = () => {
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		sendFeedback("template_utbcrmx", { // sendFeedback() récupre les variables que l'on retrouve dans le template
			name,
			company,
			phone,
			email,
			message,
		});
	};

	const sendFeedback = (templateId, variables) => { // on lance une fonction async pour récupéré les données si cela fonction ou envoyer un message d'erreur si l'action n'est pa valide
		window.emailjs
			.send("gmail", templateId, variables)
			.then((res) => {
				console.log("success !"); // tout les "set" suivant vont remettre le template à zéro
				setName("");
				setCompany("");
				setPhone("");
				setEmail("");
				setMessage("");
			})
			.catch(
				(err) =>
					(document.querySelector(".form-message").innerHTML =
						"Oops 😥! Une erreur s'est produite, veuillez réessayer.")
			);
	};

	return (
		<form className="contact-form">
			<h2>Contactez-moi</h2>
			<div className="form-content">
				<input
					type="text"
					id="name"
					name="name"
					onChange={(e) => setName(e.target.value)} //après chaque changement on récupère la value de chaque input pour la stocker dans les variables correspondantes
					placeholder="nom *"
					value={name}
					autoComplete="off"
				/>
				<input
					type="text"
					id="company"
					name="company"
					onChange={(e) => setCompany(e.target.value)}
					placeholder="société"
					value={company}
				/>
				<input
					type="text"
					id="phone"
					name="phone"
					onChange={(e) => setPhone(e.target.value)}
					placeholder="téléphone"
					value={phone}
				/>
				<div className="email-content">
					<label id="not-mail">Email non valide !</label>
					<input
						type="mail"
						id="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="email *"
						value={email}
						autoComplete="off"
					/>
				</div>
				<textarea
					id="message"
					name="message"
					onChange={(e) => setMessage(e.target.value)}
					placeholder="message *"
					value={message}
				/>
			</div>
			<input
				className="button"
				type="button"
				value="Envoyer"
				onClick={handleSubmit} // au clique, la fonction handleSublit() est lancée
			/>
			<div className="form-message"></div>
		</form>
	);
};

export default App;
