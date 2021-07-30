import React from 'react';
import { Card, Image} from 'semantic-ui-react';



const AdSegment = () => {
  

  return (
    <div style={{marginLeft: 10, width: '33vh', paddingBottom: 1}}>
        <a href={props.link} target="_blank" rel="noopener noreferrer">
       <Card>   
        <Image src={props.url} style={{ width: '33vh', height: '30vh', borderRadius: 5}}/>
        
        </Card>
        </a>
        </div>
        
  )
}
export default AdSegment;


// renderPerkAd = () => {
//   return this.gamerPerksAdContent().map(({title, promo, perks, }, index) => {
//       return (<AdSegment 
//         title={title}
//         url={perks}
//         challenge={<div><Icon name="bell outline"/>  <p style={{display: 'inline'}}>Kill 50,000 raiders</p></div>}
//         index={index}/>)
//   })
// }

// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />
// <Card image={"https://images.ctfassets.net/wn7ipiv9ue5v/3CCNOli589XJtSMZ0BZvcl/28045058dc24c707ad9a91461e3f2710/TOW_FOB_PC_AGNOSTIC.jpg?fm=jpg"} />

        // <Header>{props.deal}
        // <Segment.Meta>
        // <span style={{color: 'red'}}>{props.expiration}</span>
        //  </.Meta>
        //  <Segment.Description>
        //   {props.location}
        //  </Segment.Description>
        //  </Segment.Content>
        //  <Segment.Content extra>
        //  <a>
        //   <i class="money icon"></i>
        //     {props.redemptions}
        // </a>
        //  </Segment.Content>
        // </Segment>
