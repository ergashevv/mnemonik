import { Link } from 'react-router-dom'
import NavigationBtn from '../components/navigation-buttons-game';
import { useHomeContext } from '../context/home-context';
import classNames from "classnames"
import { useNavigate } from 'react-router'
import './main.scss'
import { useEffect, useState } from 'react';
import StartGameModal from '../components/start-game';
const NumbersGame = () => {
	const { cursorW, cursor, randomnumbers, tab, setCursor, dynum,  setTab, starttime, line } = useHomeContext();
	const resetCursor = (index) => {
		setCursor(0)
		setTab(index)
	}

	const [seconds, setSeconds] = useState(120)
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => setSeconds(seconds - 1), 1000)
	}, [seconds])

	useEffect(() => {
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		} if (seconds < 0) {
			navigate('/start')
		}
	})

	return (

		<>
			{
				starttime ?
					<>
						<StartGameModal time={starttime} />
					</>
					:
					<div className="game container">
						<div className='screen-countdown' style={{
							display: seconds >= 0 ? 'flex' : 'none',
							justifyContent: "space-between"
						}}>
							<span>{seconds} s</span>
							<Link to="/start">Start</Link>
						</div>
						<div className="header">
							<div
								className="num">
								<div className={parseInt(cursorW) >= 4 ? "sort-num active" : "sort-num"} >
									{
										Array(Math.floor(40)).fill(null).map((_, index) => (
											<>
												{
													tab === 0 && index < 10 ?
														<span>{index + 1})</span> : null
												}
												{
													tab === 1 && index > 9 && index < 20 ?
														<span>{index + 1})</span> : null
												}
												{
													tab === 2 && index > 19 && index < 30 ?
														<span>{index + 1})</span> : null
												}
												{
													tab === 3 && index > 29 && index <= 40 ?
														<span>{index + 1})</span> : null
												}
											</>
										))
									}
								</div>
								{Array(4).fill(null).map((_, index) => (
									<>
										{tab === index &&
											<div style={{
												gridTemplateColumns: parseInt(cursorW) === 3 ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
											}}
											 className={`cards`}>
												{
													randomnumbers.slice(dynum * tab, dynum * (tab + 1)).map((i, k) => (
														<div key={k} className={(k + 1) % line === 0 ? "active card" : "card"}>
															<div
																className={classNames("card-number", {
																	active: (k >= cursor && k < cursor + parseInt(cursorW))
																})}>
																<p >
																	{i}
																</p>
															</div>
														</div>
													))
												}
											</div>
										}
									</>
								))}
							</div>
						</div>
						<div className="tabs">
							{Array(4).fill(null).map((_, index) => (
								<button className={tab === index && 'active'} onClick={() => resetCursor(index)} key={index}>{index + 1}</button>
							))}
						</div>
						<NavigationBtn />
					</div >
			}
		</>

	);
}

export default NumbersGame