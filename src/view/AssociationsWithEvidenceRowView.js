'use strict';

import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import SpeciesLabel from './SpeciesLabel';

class AssociationsWithEvidenceRowView extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
            duration: 500,
        }
        this.renderTerm = this.renderTerm.bind(this);
    }

    renderTerm(go_node) {
        if (go_node.negated === true) {
            var styles = {
                color: 'gray',
            };
            return <del style={styles}><span>{go_node.about.label}</span></del>;
        }
        else {
            return go_node.about.label;
        }
    }

    renderEvidenceTypeLink(evidence) {
        return (
            <a title={evidence.label} href={`http://www.evidenceontology.org/term/${evidence.id}`}>
                {evidence.type}
            </a>
        )
    }

    generatedReferenceWithLink(publicationReference) {
        if(publicationReference.id.startsWith('RGD')){
            return (
                <a href={`https://google.com/?q=${publicationReference.id}`}>
                    {publicationReference.id}
                </a>
            )
        }
    }

    generatedEvidenceWithLink(evidenceWith) {
        if(evidenceWith.startsWith('RGD')){
            return (
                <a href={`https://google.com/?q=${evidenceWith}`}>
                    {evidenceWith}
                </a>
            )
        }
        // TODO: should go to UniProt
        if(evidenceWith.startsWith('UniProt')){
            return (
                <a href={`https://google.com/?q=${evidenceWith}`}>
                    {evidenceWith}
                </a>
            )
        }
        else{
            return (
                <a href={`https://google.com/?q=${evidenceWith}`}>
                    {evidenceWith}
                </a>
            )
        }
    }

    render() {
        let taxon_result = this.props.taxon_node.children[0];
        // console.log('taxon result')
        // console.log(taxon_result)
        return (
            <div>
                <div className='ontology-ribbon-assoc__row'>
                    <div className="ontology-ribbon-assoc__species">
                        <SpeciesLabel species={this.props.taxon_node.about.id}/>
                        <a href={this.props.geneUrlFormatter(taxon_result.about.id)}>
                        {taxon_result.about.label}
                        </a>
                    </div>
                    <div className="ontology-ribbon-assoc__evidence-type">
                        Evidence
                    </div>
                    <div className="ontology-ribbon-assoc__evidence-with">
                        With
                    </div>
                    <div className="ontology-ribbon-assoc__evidence-reference">
                        Reference
                    </div>
                </div>
                {
                    taxon_result.children.map((go_node) => {
                        // console.log('children_node');
                        // console.log(this.props.taxon_node.children);
                        // console.log('go_node');
                        // console.log(go_node);
                        return (
                            <div className='ontology-ribbon-assoc__row' key={go_node.about.id}
                                 style={{backgroundColor: this.props.taxon_node.color}}>
                                <div className='ontology-ribbon-assoc__species'>
                                    <a
                                        title={go_node.about.label}
                                        href={`http://amigo.geneontology.org/amigo/term/${go_node.about.id}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {this.renderTerm(go_node)}
                                    </a>
                                </div>

                                <div className="ontology-ribbon-assoc__evidence-type">
                                    {this.renderEvidenceTypeLink(go_node.evidence)}
                                </div>
                                <div
                                    className="ontology-ribbon-assoc__evidence-with">
                                    {go_node.evidence.with &&
                                        go_node.evidence.with.map( (e,index) => {
                                            return (
                                                <div key={index}>
                                                {this.generatedEvidenceWithLink(e)}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div
                                    className="ontology-ribbon-assoc__evidence-reference">
                                    {go_node.publications &&
                                    go_node.publications.map( (e,index) => {
                                        return (
                                            <div key={index}>
                                                {this.generatedReferenceWithLink(e)}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );

    }

}

AssociationsWithEvidenceRowView.propTypes = {
    taxon_node: PropTypes.object.isRequired,
    geneUrlFormatter: PropTypes.func,
    key: PropTypes.any,
};

export default AssociationsWithEvidenceRowView;