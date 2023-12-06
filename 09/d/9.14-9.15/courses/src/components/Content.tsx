import CoursePart from '../types';
import Part from './Part';

const Content = (part: CoursePart) => {
    return <p><Part {...part} /></p>
}

export default Content;