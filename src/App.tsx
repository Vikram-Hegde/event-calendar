import './App.css'
import Logo from './assets/logo.svg'

function App() {
	return (
		<>
			<header className="bg-slate-100 px-[max(2rem,50%-1100px/2)] py-4">
				<img src={Logo} alt="logo" />
			</header>
		</>
	)
}

export default App
