import React, { useState } from "react"; //on appelle le useState car on utilise des hooks pour tout ce qui sera renseigné des les inputs

const App = () => {
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const isEmail = () => { // sert à vérifier le format de l'email 
		let mail = document.getElementById('not-mail'); // pointe sur le label pour afficher le message d'erreur
		let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (email.match(regex)) { //on vérifie si le mail match avec la reagex

			mail.style.display = 'none';
			return true;

		} else {

			mail.style.display = 'block';
			mail.style.animation = 'dongle 1s';
			setTimeout(() => { // permet de relancer l'animation à chaque fois qu'il y a une erreur dans le format du mail
				mail.style.animation= 'none';
			}, 1000);
			return false;

		}
	};

	const failMessage = (messageError) => {
		let formMess = document.querySelector('.form-message');

		formMess.innerHTML = messageError; //message d'erreur que nous allons mettre en paramètre en fonction du type d'erreur
		formMess.style.opacity = '1';
		formMess.style.background = 'rgb(253,87,87)';

		document.getElementById('name').classList.add('error');
		document.getElementById('email').classList.add('error');
		document.getElementById('message').classList.add('error');
	}

	const successMessage = () => {
		let formMess = document.querySelector('.form-message');
		formMess.innerHTML = 'Message envoyé 👍👍 Nous vous recontacterons dès quee possible.';
		formMess.style.background = '#00c1ec';
		formMess.style.opacity = '1';

		document.getElementById('name').classList.remove('error');
		document.getElementById('email').classList.remove('error');
		document.getElementById('message').classList.remove('error'); //on enlève les messages d'erreurs

		setTimeout(() => { //enlève le successMessage au bout de qq secondes
			formMess.style.opacity = '0';
		}, 5000);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (name && isEmail() && message) { //cette condition va rendre obligatoire le renseignement des élèments importants
			sendFeedback("template_utbcrmx", {
				// sendFeedback() récupre les variables que l'on retrouve dans le template
				name,
				company,
				phone,
				email,
				message,
			});
		} else {
			failMessage("Merci de remplir correctement les champs requis *");
		}
	};

	const sendFeedback = (templateId, variables) => {
		// on lance une fonction async pour récupéré les données si cela fonction ou envoyer un message d'erreur si l'action n'est pa valide
		window.emailjs
			.send("gmail", templateId, variables)
			.then((res) => {
				successMessage(); // tout les "set" suivant vont remettre le template à zéro
				setName("");
				setCompany("");
				setPhone("");
				setEmail("");
				setMessage("");
			})
			.catch(
				(err) => {
					failMessage("Oops 😥! Une erreur s'est produite, veuillez réessayer.")
				}
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
