import React from "react";
import VideoJS from "../../utils/VideoJS.jsx";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import styles from "./Post.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { EmailShareButton } from "react-share";
import { Link } from "react-router-dom";
// GIF by Ekaterine Kantaria from https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=animation&utm_content=9342
import defaultImg from "../../assets/loader-9342_512.gif";

export default function Post(props) {
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: props.video,
          type: 'application/x-mpegURL'
        }]
      };
    
      const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });
      };

    return (
        <div className={styles.outerDiv}>
            <div className={styles.headingDiv}>
                <div className={styles.infoDiv}>
                    <div className={styles.userDiv}>
                        <div className={styles.user}>u/{props.author}</div>
                        <div className={styles.user}>{props.sub}</div>
                    </div>
                    <Link to={`/ViewPost/${props.id}`} className={styles.title}>{props.title}</Link>
                </div>
                <div className={styles.iconDiv}>
                    <Link to={`/ViewPost/${props.id}`} className={styles.title}>
                        <FontAwesomeIcon className={styles.icon} icon={faComments} />
                    </Link>  
                    <EmailShareButton url={'https://redd.it/' + props.id}
                                        subject='Check out this Reddit post'
                                        body='Follow this link to view a reddit post I enjoyed:'>                  
                        <FontAwesomeIcon className={styles.icon} icon={faShareFromSquare} />
                    </EmailShareButton>
                </div>
            </div>
            {props.redditMedia ? <></> : <a href={props.url} target='_blank'>{props.url}</a>}
            {props.video === null
                ? <img style={props.preview === null 
                            ? {display: 'none'} 
                            : {display: 'block'}} 
                    className={styles.postImg} 
                    src={props.preview === 'default'
                            ? defaultImg
                            : props.preview} 
                    alt='Post image missing' />
                : <div className={styles.videoDiv} style={props.videoLandscape === true ? {width: '95%'} : {width: '55%'}}>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </div>}
            <p style={props.text === null ? {display: 'none'} : {display: 'block'}}>{props.text}</p>
        </div>
    );
};