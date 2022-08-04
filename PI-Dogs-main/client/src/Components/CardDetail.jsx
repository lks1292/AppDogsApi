import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../Actions";


export default function CardDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const myDog = useSelector((state) => state.myDog);
    
}
