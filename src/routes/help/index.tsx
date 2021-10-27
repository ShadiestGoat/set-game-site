import {Fragment, FunctionComponent, h} from "preact"
import SetCardGen from "../../components/cards/setcard"
import { setCard } from "../../components/gameHelper"
import { NavBar } from "../../components/NavBar"
import style from "./style.css"

const DisplaySetCard:FunctionComponent<{card: setCard}> = ({card}) => <SetCardGen card={card} selected={false} onClick={() => {return}} />


const HelpPage:FunctionComponent = () => {
    return <Fragment>
        <NavBar page="help" />
        <h1 style={{marginTop: "5vh"}}>Help</h1>
        <div class={style.row}>
            <div class={style.col} style={{width: "60vw"}}>
                <h4 style={{marginTop: "5vh", lineHeight: "4vh"}}>
                Your goal is to collect all sets possible, as fast as possible. <br />
                A 'set' is a group of 3 cards that have no odd one out. To find one,<br />
                you need to look at the 4 properties of the cards: Number, Shape, Color and Filling.<br />
                The basic rule is that if 2 cards share a property, then the other one must have that property too.<br />
                The cards will be presented on a board 3x4. If there isn't a set within those 12 cards,<br />
                another column will be added. This means there is always a set,<br />
                you just gotta find it!
                </h4>
            </div>
            <div class={style.col}>
                <div class={style.row} style={{
                boxShadow: "0 0 20px 2px #18f018, inset 0 0 12px 0px #18f018",
                borderRadius: "6.25px",
                padding: "4px 4px 4px 0px",
                border: "3px solid white"
                }}>
                    <DisplaySetCard card="1orf" />
                    <DisplaySetCard card="2orf" />
                    <DisplaySetCard card="3orf" />
                </div>
                <div class={style.row} style={{
                boxShadow: "0 0 20px 2px #e42134, inset 0 0 12px 0px #e42134",
                borderRadius: "6.25px",
                padding: "4px 4px 4px 0px",
                border: "3px solid white",
                marginTop: "2vh",
                }}>
                    <DisplaySetCard card="1wrf" />
                    <DisplaySetCard card="1orf" />
                    <DisplaySetCard card="1rgf" />
                </div>
            </div>
        </div>
    </Fragment>
}

export default HelpPage

/**
Text

Your goal is to collect all sets possible, as fast as possible. A 'set' is a group of 3 cards that have no odd one out. To figure that out,
you need to look at the 4 properties of the cards: Number, Shape, Color and Filling. The basic rule is that if 2 cards share a property, then
the other one must have that property too. To the right are some examples of the cards.
The cards will be presented on a board 3x4. If there isn't a set within those 12 cards, another row will be added. This means there is always a set,
you just gotta find it!

Examples:

`${Num}${Shape}${Color}${Fill}`
type Num = '1' | '2' | '3'
type Shape = 'w' | 'r' | 'o'
type Color = 'r' | 'p' | 'g'
type Fill = 'f' | 'e' | 's'

1wrs
2rgf
3ope

Number: :tick: all different
Shape : :tick: all different
Color : :tick: all different
Fill  : :tick: all different

1rrf
1rrs
1rre

Number: :tick: all the same
Shape : :tick: all the same
Color : :tick: all the same
Fill  : :tick: all different


1wgf
2ogf
3rgf

Number: :tick: all different
Shape : :tick: all different
Color : :tick: all the same
Fill  : :tick: all the same

3rre
3rre
3rrf

Number: :tick: all the same
Shape : :tick: all the same
Color : :tick: all the same
Fill  : :x: 2 are the same, 1 is different

(I've take all these out of the actual set manual I have)

 */
