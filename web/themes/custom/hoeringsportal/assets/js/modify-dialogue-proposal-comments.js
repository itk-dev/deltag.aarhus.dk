Drupal.behaviors.modifyDialogueProposalComments = {
  attach: function (context, settings) {
    once('modifyDialogueProposalComments', '.comments .indented', context).forEach(
      function (element) {
        let prev = element.previousElementSibling;
        prev.append(element)
      }
    )
  }
}
