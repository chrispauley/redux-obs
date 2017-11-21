import React from 'react';
import {connect} from 'react-redux';
import {fetchStories, loadStories, clear} from '../actions/storyActions'


export function Stories(props) {
    var storyProps = props.storiesReducer;
    if (storyProps.loading) {
        return (<p>Please wait...</p>)
    }
    return (
        <div>
            <button type='button' onClick={props.fetchStories}>Fetch 5 Stories</button>
            <button type='button' onClick={props.loadStories}>Load top 3 Stories</button>
            <button type='button' onClick={props.clear}>Clear</button>
            <StoryList {...storyProps} />
            { storyProps.stories && 
            <FetchedStoryList {...storyProps}/>
            }
        </div>
    );
}

function StoryList(props) {
    // console.log(props);
    if (props.items.length === 0) return null;
    return (
        <div>
            {props.items.map(item => <Story {...item} key={item.id} />)}
        </div>
    );
}

function Story (props) {
    return (<p>{props.title}</p>)
}

function FetchedStoryList(props) {
    return (
        <ul>
            {props.stories.map(story =>
                <li key={story.id}>
                    <a href={story.url}>{story.title}</a>
                </li>
            )}
        </ul>
    )
}

function mapState(state) {
    return state;
}
function mapDispatch(dispatch) {
    return {
        fetchStories: () => dispatch(fetchStories()),
        loadStories: () => dispatch(loadStories()),
        clear: () => dispatch(clear())
    };
}

export default connect(mapState, mapDispatch)(Stories);
