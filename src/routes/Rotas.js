import React from 'react'
import { HashRouter, Switch, Route} from 'react-router-dom'

import Inicio from '../pages/Inicio'
import Musicas from '../pages/Musicas'

export default function Rotas (){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/musicas" component={Musicas} />
            </Switch>
        </HashRouter>
    )
}
   