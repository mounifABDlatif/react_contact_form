import React, { useState } from 'react';

const App = () => {
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");	
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		sendFeedback("***TEMPLATE_ID***",{
			name,
			company,
			phone,
			email,
			message
		});
	};

	const sendFeedback = (templateId, variables) => {
		window.emailjs
		.send("gmail", templateId, variables)
		.then((res) => {
			console.log("success !");
			
		})
	}
}