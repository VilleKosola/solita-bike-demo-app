// import { render, screen } from '@testing-library/react';
// import Pagination from './filtering';

// test('test no previous exists button if offset is 0', () => {
//   render(
//     <Pagination
//       offsetChange={() => ''}
//       limitChange={() => ''}
//       limit={100}
//       offset={0}
//     />
//   );
//   const parent = screen.getByTestId('pagination-parent');
//   expect(parent.querySelector('#offset-previous')).not.toBeInTheDocument();
// });

// test('test previous button exists if offset is > 0', () => {
//   render(
//     <Pagination
//       offsetChange={() => ''}
//       limitChange={() => ''}
//       limit={100}
//       offset={100}
//     />
//   );
//   const parent = screen.getByTestId('pagination-parent');
//   expect(parent.querySelector('#offset-previous')).toBeInTheDocument();
// });

// test('test pagination limits', () => {
//   render(
//     <Pagination
//       offsetChange={() => ''}
//       limitChange={() => ''}
//       limit={100}
//       offset={0}
//     />
//   );
//   const limitSelect: HTMLSelectElement = screen.getByTestId('limit-select');

//   expect(limitSelect.options.length).toBe(4);
// });

export{}