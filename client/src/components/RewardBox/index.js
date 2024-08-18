import React from 'react'; 
import images from '../../assets/images'; 
import './index.css';
 
function RewardBox(props) {
  const { title, count, noarrow, countbuddies, onClick} = props; 
  const { arrow, teher } = images; 
 
  var replacementcountbuddies = title.split('$')
  replacementcountbuddies.splice(1, 0, <span key={Math.random()+543} style={{color:'black'}}>{countbuddies}</span>)
  
  return( 
      <div className="rewardBoxContainer" onClick={(e) => (onClick(e))}> 
        <div style={{width: `${ noarrow ? '100%' : '80%'}`}} className='rewardBoxTitleContainer'>
          <div style={{fontSize: `${ noarrow ? '16px' : '17px'}`}} className='rewardBoxTitle'>{replacementcountbuddies}</div>
          <div className='rewardBoxCount'> <img className='arrowImg' src={teher} />&nbsp;{count}</div>
        </div>
        {
          noarrow ? 
          <></>
          :
          <div className='rewardBoxArrowContainer'>
            <img className='arrowImg' src={arrow} />
          </div>
        } 
      </div>   
  );
}

export default RewardBox;