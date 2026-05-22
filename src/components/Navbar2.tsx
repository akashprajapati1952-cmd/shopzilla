import { Component } from "react";
import { IoHome } from "react-icons/io5";
import Icons from "./Icons";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoCart } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";

interface Navebar2Props {}

export default class Navbar2 extends Component<Navebar2Props> {
    render(){
        return (
          <div className="flex justify-between grow">
            <Icons Icon={IoHome} heading="Home" path="/"/>
            <Icons Icon={IoCart} heading="Cart" path="/cart"/>
            <Icons Icon={RiAccountCircleFill} heading="Account" path="/profile"/>
            <Icons Icon={BsInfoCircle} heading="About us" path="/about"/>

          </div>
        )

    }
}