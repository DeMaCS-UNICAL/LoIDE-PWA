import React from "react";
import logo from "../assets/img/logo_LoIDE.svg";

const About: React.FC = () => {
  const loideVersion = process.env.REACT_APP_LOIDE_VERSION;
  return (
    <div style={{ lineHeight: "20px" }}>
      <div className="ion-text-center ion-margin-top">
        <div
          style={{ display: "flex" }}
          className="ion-justify-content-center ion-align-items-center"
        >
          <img src={logo} alt="loide-logo" className="logo" width="150" />
          <span className="font-pwa about-modal">(PWA)</span>
        </div>

        <p className="ion-text-center">
          <em>
            Version:
            <span className="version"> {loideVersion}</span>
          </em>
        </p>
      </div>
      <p style={{ marginBottom: "40px" }} className="ion-text-center">
        <em>LoIDE PWA is a Progressive Web App IDE for Logic Programming</em>
        <br />
      </p>

      <p className="ion-text-justify">
        Checkout the LoIDE project website: <br />
        <a href="https://demacs-unical.github.io/LoIDE/" rel="noopener noreferrer" target="_blank">
          demacs-unical.github.io/LoIDE
        </a>
      </p>
      <p>
        LoIDE PWA is an Open Source project available on{" "}
        <a
          href="https://github.com/DeMaCS-UNICAL/LoIDE-PWA"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github <i className="fa fa-github"></i>
        </a>
      </p>
      <p className="ion-text-justify">
        It&apos;s released under{" "}
        <a
          href="https://github.com/DeMaCS-UNICAL/LoIDE-PWA/blob/main/LICENSE"
          rel="noopener noreferrer"
          target="_blank"
        >
          MIT License
        </a>
      </p>

      <p className="ion-text-justify">
        If you have any questions or suggestions, please write an e-mail to{" "}
        <em>
          loide<span style={{ display: "none" }}>ABC</span>
          @mat.unical.it{" "}
        </em>
      </p>

      <p className="ion-text-justify">
        <strong>
          Use of all solvers and systems is provided under the respective licenses; we refrain from
          taking any responsibility for any use that goes out of the scopes of such licenses.
        </strong>
      </p>

      <p className="ion-text-justify">
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
        INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
        FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </p>
    </div>
  );
};

export default About;
