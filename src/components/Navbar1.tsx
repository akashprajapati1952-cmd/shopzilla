import { Component } from "react";
import { Link } from "react-router-dom";

interface Navebar1Props {}

export default class Navbar1 extends Component<Navebar1Props> {
    render(){
        return (
          <div className="flex justify-between items-center w-100 font-bold">
            <Link to='/'>Home</Link>
            <Link to='/cart'>Cart</Link>
            <Link to='/profile'>Account</Link>
            <Link to='/about'>About us</Link>
          </div>
        )
    }
}