import React, {PureComponent} from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import theme from '../config/theme';
import * as ViewTypes from '../constants/ViewTypes';

const styles = {
    container: {
        height: '64px',
    },
    appBar: {
        top: 0,
        position: 'fixed',
    },
    textSearch: {
        flex: '1 1 0%',
        width: '160px',
        lineHeight: '16px',
        marginTop: '9px'
    },
    textSearchHint: {
        color: theme.customStyle.lightHintColor
    },
    textInput: {
        color: theme.customStyle.lightInputColor
    }
};

class Header extends PureComponent {
    constructor(props, state) {
        super(props, state);

        this._onTextSearch = this._onTextSearch.bind(this);
        this._onSearchInputChange = this._onSearchInputChange.bind(this);
    }

    componentDidMount() {
        this._searchText = '';
    }

    render() {
        const title = this.props.filterTitle || 'News';
        const viewType = this.props.viewType;

        const defaultValue = viewType === ViewTypes.TEXT_SEARCH && this.props.searchText || '';

        // noinspection HtmlUnknownTarget
        const searchForm = (
            <form action="/search" onSubmit={this._onTextSearch}>
                <TextField
                    style={styles.textSearch}
                    hintStyle={styles.textSearchHint}
                    inputStyle={styles.textInput}

                    onChange={this._onSearchInputChange}

                    name="text"
                    defaultValue={defaultValue}
                    hintText="Search text" />
            </form>
        );

        return (
            <div style={styles.container}>
                <AppBar
                    style={styles.appBar}
                    title={title}
                    onLeftIconButtonTouchTap={this.props.onMenuButtonTap}>
                    {searchForm}
                </AppBar>
            </div>
        );
    }

    _onSearchInputChange(e, text) {
        this._searchText = text;
    }

    _onTextSearch(e) {
        let text = this._searchText || '';
        text = text.trim();

        if (text) {
            this.props.onTextSearch(text);
        }

        e.preventDefault();
    }
}

export default Header;

