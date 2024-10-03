import { Link } from "react-router-dom";

function Forgotpassword () {
  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="row w-100 justify-content-center">


        <div className="col-lg-4 col-12 d-flex flex-column justify-content-center align-items-center p-4">
          <div className="w-100">
            <h2 className="text-center text-warning font-weight-bold mb-4">
              TRIP MANAGEMENT
            </h2>

            <form>
              <div className="form-group">
                <input
                  className="form-control bg-light border border-secondary mb-3"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>

              <button className="btn btn-warning w-100 mb-3">
                Send Reset Link
              </button>
            </form> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
