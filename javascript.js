	var firebaseConfig = {
		apiKey: "AIzaSyB9s0IY1sQyd3jS96PdPc3KBCSl7VFaTK4",
		authDomain: "jr-arguelles.firebaseapp.com",
		databaseURL: "https://jr-arguelles-default-rtdb.firebaseio.com",
		projectId: "jr-arguelles",
		storageBucket: "jr-arguelles.appspot.com",
		messagingSenderId: "46118742765",
		appId: "1:46118742765:web:8924cd1e42dca81b607ae4",
		measurementId: "G-2NJYLW57JT"
	}

	firebase.initializeApp(firebaseConfig)
	
	const db = firebase.firestore()
	const form = document.querySelector('#task-form')
	const taskContainer = document.querySelector('#tasks-container')

	let editStatus = false
	let id = ''
	let time = new Date().toISOString()
	db.collection("programadores").orderBy("nombre", "desc")

	const SaveUser = (nombre,phonex,lenguaje,fecha) => {
		db.collection("programadores").doc().set({
			nombre,
			phonex,
			lenguaje,
			fecha			
		})

		.then (function (docRef) {
			MJSOK();

		})

		.catch(function(error) {
			MSJERROR();

		});
	}

	const MJSOK =()=>{
		swal('Listo!', 'Ya te registraste', 'success')
	}


	const MSJERROR =()=>{
		swal('Ops!', 'No te pudimos registrar', 'error')
	}


	const getTasks = () => db.collection('programadores').get()
	const onGetTasks = (callback) => db.collection('programadores').onSnapshot(callback)
	const getTask = (id) => db.collection('programadores').doc(id).get()
	const updateTask = (id, updateTask) => db.collection('programadores').doc(id).update(updateTask)

	window.addEventListener('DOMContentLoaded', async (e) => {
		db.collection("programadores").orderBy("nombre", "desc")
		onGetTasks((querySnapshot) => {
			taskContainer.innerHTML = ''

			querySnapshot.forEach((doc) => {
				const task = doc.data()
				task.id = doc.id

				taskContainer.innerHTML += `
					<div class=".col-12 .col-md-8 card card-body mt-2 mx-2 border-success">
						<h3 class="text-primary"><b>${task.lenguaje}</b></h3>
						<p style="margin-bottom: 0px;">${task.nombre}</p>
						<p style="margin-bottom: 0px;">${task.phonex}</p>
					</div>
				`
			})
		})
	})


$("#btnsave").on('click',()=>{


		let nombre = $("#task-title").val();
		let phonex = $("#task-phone").val();
		let lenguaje = $("#task-lenguaje").val();
		let fecha = new Date();

			SaveUser(nombre,phonex,lenguaje,fecha);
			document.getElementById("task-form").reset();
			db.collection("programadores").orderBy("nombre", "desc")		


	
})