import React from 'react'

export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">Paco</span>
            <button className="btn btn-outline-danger">
                Salir
                <i className=" ml-2 fas fa-sign-out-alt"></i>
            </button>
        </div>
    )
}