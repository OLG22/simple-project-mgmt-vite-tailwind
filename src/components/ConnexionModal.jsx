import React from 'react'

export default function ConnexionModal() {
    return (
        <>
            <div className="modal fade" id="connexionModal" tabIndex="-1" aria-labelledby="connexionModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="connexionModalLabel">Connexion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signInEmail" className="form-label">Email Address</label>
                                    <input name="email" type="email" className="form-control" id="signInEmail" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signInPwd" className="form-label">Password</label>
                                    <input name="pwd" type="password" className="form-control" id="signInpPwd" required />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-primary">Se connecter</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
