import { Component, Fragment, h } from "preact";
import Particles from "particles-bg"
import { rand } from "../tools";

export class IndexPage extends Component<{}> {

    render() {
        return (
            <Fragment>
                <nav class="navbar-wrapper">
                    <img className="nav-item navbar-item-1" style="width: 3rem; height:3rem; border-radius: 50%;" src="https://shadygoat.eu/pfp.png" />
                    <div className="navbar-item-last">
                        <ul class="navbar">
                            <li class="nav-item">
                                <a class="nav-link active" href="/help" aria-current="page">Help</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/s">Play Singleplayer</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/m">Play Multiplayer</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" style={{fontSize: "85%"}} href="/changelog">Changelog</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <Particles  bg={true}
                    type="custom"
                    num={555}
                    config={
                        {
                            num: [20],
                            rps: 0,
                            radius: [5, 40],
                            life: [1.5, 3],
                            v: [2, 3],
                            tha: [-40, 40],
                            alpha: [0.6, 0],
                            scale: [1, 0.1],
                            position: "center", // all or center or {x:1,y:1,width:100,height:100}
                            color: ["random", "#ff0000"],
                            cross: "dead", // cross or bround
                            random: 255,  // or null,
                            g: 3,    // gravity
                            // f: [0, 20], // force
                            onParticleUpdate: (ctx, particle) => {
                                ctx.beginPath();
                                ctx.font = '25px Arial';
                                // ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
                                ctx.fillStyle = particle.color;
                                ctx.fillText("OwO", particle.p.x, particle.p.y)
                                ctx.fill();
                                ctx.closePath();
                            },
                          }
                    }
                    // config={{num: [4, 7],rps: 0.1,radius: [5, 40],life: [1.5, 3],v: [2, 3],tha: [-40, 40],alpha: [0.6, 0],scale: [1, 0.1],position: "center",color: ["random", "#ff0000"],cross: "dead",random: 15,g: 5,onParticleUpdate: (ctx, particle) => {ctx.beginPath();ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);ctx.fillStyle = particle.color;ctx.fill();ctx.closePath();}}                    }
                    />
                    {/* <h1 style={{marginTop: "31vh"}}>OwO</h1> */}
                </div>
            </Fragment>
        )
    }
}