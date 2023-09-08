
 export default function games() {
    function call() {
            fetch(`https://rawg-video-games-database.p.rapidapi.com/games/?key=a8d817fa172443748735ff2d10862681`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '48bcd47c97msh29aeb9d40c8bed9p1b117bjsn539a69073325',
                    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'            
                    }
                    })
                    .then(result => result.json())
                    .then(data => {return data})
    }
       call() 
    }
    
    



   