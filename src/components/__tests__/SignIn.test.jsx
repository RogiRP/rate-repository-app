import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { SignInContainer } from "../SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />,
      );

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
      });

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText("Password"), "password");
      });

      await act(async () => {
        fireEvent.press(getByText("Sign in"));
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith(
          { username: "kalle", password: "password" },
          expect.anything(),
        );
      });
    });
  });
});
