import React, { Component } from 'react';

import Accordion from '../../Components/Accordion';

import { withHocks } from '../../Context/WithParams';

class Dashboard extends Component {
  componentDidMount = () => {
    const { loadingParam: { dispatchLoading } } = this.props;
    dispatchLoading(false);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Accordion
            idAccordion="faqAccordion"
            data={
                [
                  {
                    title: 'FAQ Pertama',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, magna at elementum semper, turpis massa pellentesque ante, sed mattis leo quam at lectus. Vestibulum sed dictum est. Quisque placerat, elit ut fermentum lobortis, augue nulla mollis nibh, eleifend imperdiet mi ipsum ac dolor. Donec eget mi erat.',
                    show: true,
                    type: 'primary',
                  },
                  {
                    title: 'FAQ Kedua',
                    desc: 'Aenean sapien odio, varius et fermentum eu, consequat et magna. Quisque eget varius purus, nec porttitor urna. Vivamus scelerisque viverra tincidunt. Fusce commodo dui lectus, quis ornare odio egestas ac. Nullam euismod tellus in magna dignissim scelerisque. Etiam posuere nunc suscipit placerat luctus.',
                    show: false,
                    type: 'warning',
                  },
                  {
                    title: 'FAQ Ketiga',
                    desc: 'Aenean sapien odio, varius et fermentum eu, consequat et magna. Quisque eget varius purus, nec porttitor urna. Vivamus scelerisque viverra tincidunt. Fusce commodo dui lectus, quis ornare odio egestas ac. Nullam euismod tellus in magna dignissim scelerisque. Etiam posuere nunc suscipit placerat luctus.',
                    show: false,
                    type: 'primary',
                  },
                ]
              }
            />
        </div>
      </div>
    );
  }
}

export default withHocks(Dashboard);
