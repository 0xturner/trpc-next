import { NextPageWithLayout } from './_app';

/**
 * Todo:
 * string
 * number
 * date
 * file upload
 */

const SubmitPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Welcome to your tRPC starter!</h1>

      <hr />

      <h3>Add a Post</h3>

      <form onSubmit={() => console.log('submit')}>
        <label>
          Title
          <br />
          <input {...methods.register('title')} className="border" />
        </label>
      </form>
    </>
  );
};

export default SubmitPage;
