import Browser
import Html exposing (Html, button, div, text, p, input)
import Html.Events exposing (onClick, onInput)


main =
  Browser.sandbox { init = init, update = update, view = view }


-- MODEL

type alias Model = { count : Int, message : String }

init : Model
init = Model 0 ""


-- UPDATE

type Msg = Increment | Decrement | ChangeMessage String

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      { model | count = model.count + 1 }

    Decrement ->
      { model | count = model.count - 1 }

    ChangeMessage message ->
      { model | message = message }


-- VIEW

view : Model -> Html Msg
view model =
  div []
    [
    div []
      [ button [ onClick Decrement ] [ text "-" ]
      , div [] [ text (String.fromInt model.count) ]
      , button [ onClick Increment ] [ text "+" ]
      ],
    div []
      [
      p [] [ text model.message ],
      input [ onInput ChangeMessage ] []
      ]
    ]
