using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Database.Entity
{
    public class ProgrammedTask
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(5, ErrorMessage = "The task description has to be at least 5 characters long.")]
        [MaxLength(512, ErrorMessage = "The task description has to be less than 512 characters.")]
        public required string Description { get; set; }

        public bool Finished { get; set; }

    }
}
