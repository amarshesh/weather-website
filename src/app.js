const path = require ('path')
const hbs= require ( 'hbs')
const request = require('request')
const geocode = require ( './utils/geocode')
const weather = require ( './utils/weather-app')
// nicest way to approach to any directory its an inbuilt function so we need not to install it !!!
const express = require ('express')

// creating the paths where we want to reach 
const path_name = path.join(__dirname, '../public') ;
const pathviews = path.join (__dirname, '../templates/views' )
const pathheader = path.join (__dirname, '../templates/partial' )

//console.log( path_name)

const app = express( )

// this set value help to set somthing that we are going to use in future 
app.set('view engine', 'hbs')
app.set ('views', pathviews)
app.use(express.static(path_name))
hbs.registerPartials(pathheader)

app.get ('',  (req , res ) =>
{
     res.render(('index') , { 
         title : 'Weather',
         name : 'Amarshesh sharma ',
         general: 'Your indexing stars here'
     })
})

app.get ('/about' ,( req ,res)=>
{
    res.render(('about') ,   {
        title : 'About',
        name: 'Amarshesh sharma ',
        general: 'its some short information about me !!' 
    })

})

app.get ( '/help', ( req  , res)=>
{
    res.render ( ('help') , {
        title :  'Help!!',
        name : 'Amarshesh sharma ',
        general : ' how can i help you ??'

    })
})



app.get ('/weather' , ( req,res)=>{
    if (!req.query.address){
        return res.send( {
            error:'please provide any place or adddress to find the weather!!'
        })
    }

    geocode (req.query.address , (error, {latitude, longitude , place} = {} ) => {
        if (error){
             return res.send( {error })
        }
            weather (latitude, longitude , (error ,datavalue) =>{
                if (error){
                    return res.send( {error})
                    }
                    res.send ( {
                        place: place,
                        condition : datavalue, 
                    })
            
        
        })
})
})



// app.get ('/product' , ( req,res)=>{
//     if ( !req.query.search){
//         return res.send( {
//             error:'please provide any query item!!'
//     })
// }
//     console.log (req.query)
//     res.send( {
//         product : []
//     })

// })

app.get ( '/help/*',(req ,res )=>{

    res.render('404-page' , {
        name : ' amarshesh sharma ',
        title : 'ERROR 404!!',
        errorpage : ' help page not found !'

    })
})

app.get ( '*',(req ,res )=>{

    res.render( '404-page' , {
        name : ' amarshesh sharma ',
        title : '404',
        errorpage : ' error 404 ! , page not found !'

    })
})


app.get ( '*',(req ,res )=>{

    res.send( 'COULDNT FOUND THIS PAGE, ERROR 404 !')
})


app.listen( 3000 , () =>
{
    console.log( 'this is going to run port 3000 !!')
} )