import React from 'react';

export default function Graph({graphSeg, log}) {

    function createGraph() {
        let amount = graphSeg.started + graphSeg.finish + graphSeg.complete
        let startPerc = (graphSeg.started / amount) * 100
        let completePerc = 100 - ((graphSeg.complete / amount) * 100)
        
        return {background: `linear-gradient(to right, rgb(248, 50, 208) ${startPerc}%, rgb(75, 192, 255) ${startPerc}%, rgb(75, 192, 255) ${completePerc}% ,rgb(47, 255, 82) ${completePerc}%)`}
    }
   let linesArr = Array.from({length: (log.length/5)}, (e, i) => i)
   console.log(linesArr);
            
    let lines = log.map((item) => {
            let number = log.indexOf(item)
            if(number + 1 === log.length) {
               return(
                <div className='lines' style={{height: '8px'}}>
                    <div className='number' style={{top: '12.5px'}}>{
                        number + 1 < 10 ? '0' + (number + 1) : number + 1
                    }</div>
                </div> 
               )
            } else {
                return(
                <div className='lines'>
                    <div className='number'>{
                        number + 1 < 10 ? '0' + (number + 1) : number + 1
                    }</div>
                </div> 
               )
            }            
        })
        
        let largelines = linesArr.map((item) => {
            let number = linesArr.indexOf(item)            
                return(
                <div className='lines'>
                    <div className='number'>{
                        (number + 1) * 5 < 10 ? '0' + (number + 1) * 5 : (number + 1) * 5
                    }</div>
                </div> 
               )                      
        })
           
        function createGap() {
            let minFive = (Math.floor(log.length/5)) * 5
            let diffNum = log.length - minFive
            let fiveGap = (420/log.length) * 5
            let gap = (420/log.length) * diffNum
            let negGap = fiveGap - gap

            console.log(minFive, diffNum, fiveGap, gap, negGap);

            return {marginLeft: `-${negGap}px`, height: '8px'}

        }


    return(
        <div className='data-cont'>  
            <div className='graph-cont'>
                <div 
                className="graph"
                style={createGraph()}
                >
                    <div  className='lines' style={{height: '8px'}}>
                        <div className='number' style={{top: '12.5px'}}>00</div>
                    </div>
                    {log.length <= 10 ? lines : largelines}
                    {log.length === 0 ? <div className='lines' style={{height: '8px'}}>
                        <div className='number' style={{top: '12.5px'}}>{'0' + (log.length + 1)}</div>
                    </div> : []}
                    {log.length % 5 !== 0 && log.length > 10 ? <div className='lines' style={createGap()}>
                        <div className='number' style={{top: '12.5px'}}>{log.length}</div>
                    </div> : []}
                </div>
            </div>             
            <table>
                <tbody>
                    <tr>
                        <th className='table-game'>Number of Games</th>
                        <th className='table-num'>{log.length}</th>
                    </tr>
                    <tr>
                        <th className='table-start'>Number Started</th>
                        <th className='table-num'>{graphSeg.started}</th>
                    </tr>
                    <tr>
                        <th className='table-fin'>NumberFinished</th>
                        <th className='table-num'>{graphSeg.finish}</th>
                    </tr>                                        
                    <tr>
                        <th className='table-comp'>Number Completed</th>
                        <th className='table-num'>{graphSeg.complete}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}