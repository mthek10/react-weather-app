```typescript
import { Request, Response } from 'express';
import { AppController } from './AppController';

// Mocking express response
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

// Mocking express request
const mockRequest = (): Partial<Request> => {
  return {};
};

describe('AppController', () => {
  describe('showHomePage', () => {
    it('should render the home page successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();

      await AppController.showHomePage(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.render).toHaveBeenCalledWith('home');
    });

    it('should return server error if rendering home page fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      // Mocking the render function to throw an error
      res.render = jest.fn().mockImplementation(() => {
        throw new Error('Render error');
      });

      await AppController.showHomePage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'An error occurred while rendering the home page. Please try again later.',
      });
    });
  });
});
```