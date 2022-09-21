import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { SelectOption, SelectProps } from './types'

const Select: FC<SelectProps> = ({ multiple, onChange, options, value }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	const ref = useRef<HTMLDivElement>(null)

	const clearOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()

		multiple ? onChange([]) : onChange(undefined)
	}

	const selectOption = (option: SelectOption) => {
		if (multiple) {
			if (value.includes(option)) {
				onChange(value.filter((o) => o !== option))
			} else {
				onChange([...value, option])
			}
		} else {
			if (option !== value) onChange(option)
		}
	}

	const isOptionSelected = (option: SelectOption) => {
		return multiple ? value.includes(option) : option === value
	}

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0)
	}, [isOpen])

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.target !== ref.current) return

			switch (e.code) {
				case 'Enter':
				case 'Space':
					setIsOpen((prev) => !prev)
					if (isOpen) selectOption(options[highlightedIndex])
					break
				case 'ArrowUp':
				case 'ArrowDown': {
					if (!isOpen) {
						setIsOpen(true)
						break
					}

					const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)

					if (newValue >= 0 && newValue < options.length) {
						setHighlightedIndex(newValue)
					}
					break
				}
				case 'Escape':
					setIsOpen(false)
					break
			}
		}

		ref.current?.addEventListener('keydown', handler)

		return () => ref.current?.removeEventListener('keydown', handler)
	}, [isOpen, highlightedIndex, options])

	return (
		<div
			ref={ref}
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen((prev) => !prev)}
			className={styles.container}
			tabIndex={0}
		>
			<span className={styles.value}>
				{multiple
					? value.map((v) => (
							<button
								onClick={(e) => {
									e.stopPropagation()
									selectOption(v)
								}}
								className={styles['option-badge']}
								key={v.value}
							>
								{v.label}
								<span className={styles['remove-btn']}>&times;</span>
							</button>
					  ))
					: value?.label}
			</span>

			<button onClick={clearOptions} className={styles['clear-btn']}>
				&times;
			</button>
			<div className={styles.divider}></div>
			<div className={styles.caret}></div>

			<ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
				{options.map((option, index) => (
					<li
						onClick={(e) => {
							e.stopPropagation()
							selectOption(option)
						}}
						onMouseEnter={() => setHighlightedIndex(index)}
						key={option.value}
						className={`
                            ${styles.option} 
                            ${isOptionSelected(option) ? styles.selected : ''}  
                            ${
															highlightedIndex === index
																? styles.highlighted
																: ''
														}
                        `}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Select
