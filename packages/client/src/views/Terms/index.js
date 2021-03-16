import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import ReactMarkdown from 'react-markdown';

import { getTermsData } from '../../api';
import Skeleton from '../../components/Skeleton';

const Terms = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await getTermsData();
        if (response.data.body) {
          setData(response.data.body);
        }
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Row>
      <Col style={{ padding: '50px 20px' }}>
        <h1>Terms of Use</h1>
        <br />
        <div className='post-body'>
          <ReactMarkdown allowDangerousHtml children={data} />
        </div>
        {loading && (
          <>
            <Skeleton width='100%' height={10} />
            <Skeleton width='100%' height={10} />
            <Skeleton width='100%' height={10} />
            <Skeleton width='100%' height={10} />
            <Skeleton width='100%' height={10} />
            <Skeleton width='100%' height={10} />
          </>
        )}
      </Col>
    </Row>
  );
};

export default Terms;
