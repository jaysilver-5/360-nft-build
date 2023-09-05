import styles from '../styles/Player.module.css'
import Button from '../components/basic/button/Button'
import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'


const Player = ({ progress }) => {

    const url = useSelector(state => state.player.streamUrl)

    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const audioRef = useRef(new Audio(url))
    const intervalRef = useRef()
    const isReady = useRef(false)
    const { duration } = audioRef.current

    useEffect(() => {
        audioRef.current.pause()
        audioRef.current = new Audio(url)
        setTrackProgress(audioRef.current.currentTime)
    
        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
        // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [url])

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1)
        } else {
            setTrackIndex(trackIndex - 1)
        }
    }
      
    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1)
        } else {
            setTrackIndex(0)
        }
    }

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current)
  
        intervalRef.current = setInterval(() => {
          if (audioRef.current.ended) {
            toNextTrack()
          } else {
            setTrackProgress(audioRef.current.currentTime)
          }
        }, [1000])
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
            startTimer()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        }
    }, [])

    // Handle setup when changing tracks
    // useEffect(() => {
    //     audioRef.current.pause()
    //     audioRef.current = new Audio(url)
    //     setTrackProgress(audioRef.current.currentTime)

    //     if (isReady.current) {
    //         audioRef.current.play()
    //         setIsPlaying(true)
    //         startTimer()
    //     } else {
    //     // Set the isReady ref as true for the next pass
    //         isReady.current = true
    //     }
    // }, [trackIndex])

    return (
        <div className={styles.mediaContainer}>
            <Button type='secondary' iconClass='icon-rewind'/>
            { isPlaying ?
                    <Button bg='greenToPurple' onClick={() => setIsPlaying(false)} spread='gradient' iconClass='icon-pause'/>
                    :
                    <Button bg='greenToPurple' onClick={() => setIsPlaying(true)} spread='gradient' iconClass='icon-play-arrow'/>
            }
            <Button type='secondary' iconClass='icon-fast-forward'/>
            <div className={styles.scrubber}>
                <div className={styles.progressBar}>
                    <span className={styles.progressBarFill} style={{width: `${progress}%`}}></span>
                    <span className={styles.playhead} style={{left: `calc(${progress}% - 24px)`}}></span>
                </div>
            </div>
            <Button type='secondary' iconClass='icon-volume-up'/>
            <Button type='secondary' iconClass='icon-share-inverse'/>
            <Button type='secondary' iconClass='icon-heart'/>
        </div>
    )
}

Player.defaultProps = {
    progress: '0',
}

export default Player
