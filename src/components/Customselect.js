import React from "react";
import {isMobile} from "react-device-detect";

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);

        // @defaultSelectText => Show default text in select
        // @showOptionList => Show / Hide List options
        // @optionsList => List of options
        this.state = {
            defaultSelectText: "",
            showOptionList: false,
            optionsList: []
        };
    }

    componentDidMount() {
        // Add Event Listner to handle the click that happens outside
        // the Custom Select Container
        document.addEventListener("mousedown", this.handleClickOutside);
        this.setState({
            defaultSelectText: this.props.defaultText
        });
    }

    componentWillUnmount() {
        // Remove the event listner on component unmounting
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // This method handles the click that happens outside the
    // select text and list area
    handleClickOutside = e => {
        if (isMobile) {
            if (
                !e.target.classList.contains("mobile-custom-select-option") &&
                !e.target.classList.contains("mobile-selected-text")
            ) {
                this.setState({
                    showOptionList: false
                });
            }
        }else{
            if (
                !e.target.classList.contains("desktop-custom-select-option") &&
                !e.target.classList.contains("desktop-selected-text")
            ) {
                this.setState({
                    showOptionList: false
                });
            }
        }
    };

    // This method handles the display of option list
    handleListDisplay = () => {
        this.setState(prevState => {
            return {
                showOptionList: !prevState.showOptionList
            };
        });
    };

    // This method handles the setting of name in select text area
    // and list display on selection
    handleOptionClick = e => {
        this.setState({
            defaultSelectText: e.target.getAttribute("data-name"),
            showOptionList: false
        });
    };

    render() {
        const { optionsList } = this.props;
        const { showOptionList, defaultSelectText } = this.state;
        if (isMobile) {
            return (
                <div className="mobile-custom-select-container">
                    <div
                        className={showOptionList ? "mobile-selected-text active" : "mobile-selected-text"}
                        onClick={this.handleListDisplay}
                    >
                        {defaultSelectText}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.8536 4.63301C15.0488 4.81036 15.0488 5.09789 14.8536 5.27524L8 11.5L1.14645 5.27524C0.951184 5.09789 0.951184 4.81036 1.14645 4.63301C1.34171 4.45566 1.65829 4.45566 1.85355 4.63301L8 10.2155L14.1464 4.63301C14.3417 4.45566 14.6583 4.45566 14.8536 4.63301Z" fill="white" />
                        </svg>
                    </div>
                    {showOptionList && (
                        <ul className="mobile-select-options">
                            {optionsList.map(option => {
                                return (
                                    <li
                                        className="mobile-custom-select-option"
                                        data-name={option.name}
                                        key={option.id}
                                        onClick={this.handleOptionClick}
                                    >
                                        {option.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            );
        }else{
            return (
                <div className="desktop-custom-select-container">
                    <div
                        className={showOptionList ? "desktop-selected-text active" : "desktop-selected-text"}
                        onClick={this.handleListDisplay}
                    >
                        {defaultSelectText}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.8536 4.63301C15.0488 4.81036 15.0488 5.09789 14.8536 5.27524L8 11.5L1.14645 5.27524C0.951184 5.09789 0.951184 4.81036 1.14645 4.63301C1.34171 4.45566 1.65829 4.45566 1.85355 4.63301L8 10.2155L14.1464 4.63301C14.3417 4.45566 14.6583 4.45566 14.8536 4.63301Z" fill="white" />
                        </svg>
                    </div>
                    {showOptionList && (
                        <ul className="desktop-select-options">
                            {optionsList.map(option => {
                                return (
                                    <li
                                        className="desktop-custom-select-option"
                                        data-name={option.name}
                                        key={option.id}
                                        onClick={this.handleOptionClick}
                                    >
                                        {option.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            );
        }
    }
}

export default CustomSelect;