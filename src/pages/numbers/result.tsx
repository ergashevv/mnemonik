import { useMemo, useState } from 'react'
import LeftNumber from '../../components/left-numbers'
import Tabs from '../../components/tabs'
import { useHomeContext } from '../../context/home-context'

const Result = () => {
  const [show, setShow] = useState(false)

  const {
    result,
    tab,
    randomNumbers,
    dynamic: dynum
  } = useHomeContext()

  const count = useMemo(() => {
    let count = 0
    result?.forEach((item: any, k: any) => {
      if (item !== randomNumbers.slice(dynum * tab, dynum * (tab + 1))[k]) { count++ }
    })

    return count
  }, [dynum, randomNumbers, result, tab])

  return (
    <div className="container">
      <span>Umumiy {randomNumbers.length}</span>
      <span> To'g'ri javoblar {randomNumbers.length - count}</span>
      <span> Xato javoblar {count}</span>
      <div className="start-game-group">
        <LeftNumber />
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              {tab === index && (
                <div className="inputs-groups ">
                  {result
                    ?.slice(dynum * tab, dynum * (tab + 1))
                    .map((value: any, index) => (
                      <div key={index}>
                        <>
                          <input
                            readOnly
                            style={{
                              color:
                                value ==
                                randomNumbers.slice(
                                  dynum * tab,
                                  dynum * (tab + 1)
                                )[index]
                                  ? 'green'
                                  : 'red',
                              fontWeight: 'bold'
                            }}
                            className="number-page-input"
                            value={value}
                            type="text"
                          />
                          {show && (
                            <input
                              readOnly
                              value={
                                randomNumbers.slice(
                                  dynum * tab,
                                  dynum * (tab + 1)
                                )[index]
                              }
                              className="number-page-input"
                              type="text"
                            />
                          )}
                        </>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="tabs">
        <Tabs tabNumber={4} />
      </div>
      <button onClick={() => setShow(!show)}>
        {show ? 'user result' : 'show result'}
      </button>
    </div>
  )
}
export default Result
