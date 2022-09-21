import { useState } from 'react'
import { Select } from './components'
import { SelectOption } from './components/select/types'

const options = [
	{ label: 'First', value: 1 },
	{ label: 'Second', value: 2 },
	{ label: 'Third', value: 3 },
	{ label: 'Fourth', value: 4 },
	{ label: 'Fifth', value: 5 },
	{ label: 'Sixth', value: 6 },
	{ label: 'Seventh', value: 7 },
]

function App() {
	const [value, setValue] = useState<SelectOption | undefined>(options[0])
	const [value2, setValue2] = useState<SelectOption[]>([])

	return (
		<div className="app">
			<Select options={options} value={value} onChange={(o) => setValue(o)} />
			<Select
				multiple
				options={options}
				value={value2}
				onChange={(o) => setValue2(o)}
			/>
		</div>
	)
}

export default App
